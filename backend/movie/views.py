import logging
from django.utils import timezone
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import (
    IsAdminUser, BasePermission, IsAuthenticated, SAFE_METHODS)
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters

from core.models import Genre, LikedMovie, Movie, Rental, Purchase

from movie import serializers


class IsAdminOrReadOnly(BasePermission):
    """Object-level permission to only allow admin users to edit an object
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return True

        # Instance must belong to an admin user
        return request.user.is_staff


class BaseMovieAttrViewSet(viewsets.GenericViewSet,
                           mixins.ListModelMixin,
                           mixins.CreateModelMixin):
    """Base viewset for movie attributes
    """
    authentication_classes = (JWTAuthentication,)

    def get_queryset(self):
        """Return objects for the current authenticated user only
        """
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(movie__isnull=False)

        return queryset.filter(
            user=self.request.user
        ).order_by('-name').distinct()

    def perform_create(self, serializer):
        """Create a new object
        """
        serializer.save(user=self.request.user)


class GenreViewSet(BaseMovieAttrViewSet):
    """Manage Genre in the database
    """
    permission_classes = (IsAdminUser,)
    queryset = Genre.objects.all()
    serializer_class = serializers.GenreSerializer


class StandardResultsSetPagination(PageNumberPagination):
    """Custom standard pagination class
    """
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })


class MovieViewSet(viewsets.ModelViewSet):
    """Manage movies in the database
    """
    serializer_class = serializers.MovieSerializer
    search_fields = ['title', ]
    filter_backends = (filters.SearchFilter,)
    queryset = Movie.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    pagination_class = StandardResultsSetPagination

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers

        Args:
            qs (list): Query String
        """
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the movies for all users
        """
        genre = self.request.query_params.get('genre')
        availability = self.request.query_params.get('availability')
        order_by = self.request.query_params.get('order_by')
        queryset = self.queryset
        is_staff = self.request.user.is_staff

        if genre and availability:
            genre_ids = self._params_to_ints(genre)
            queryset = queryset.filter(
                availability=availability.capitalize(),
                genre__id__in=genre_ids
            ).order_by('id')
        elif genre:
            genre_ids = self._params_to_ints(genre)
            queryset = queryset.filter(
                genre__id__in=genre_ids
            ).order_by('id')
        elif availability:
            queryset = queryset.filter(
                availability=availability.capitalize()
            ).order_by('id')

        # only admin users can view all movies, available or not
        if is_staff:
            if order_by:
                return queryset.all().order_by(order_by)
            else:
                return queryset.all().order_by('title')
        else:
            if order_by:
                return queryset.filter(
                    availability=True
                ).order_by(order_by)
            else:
                return queryset.filter(
                    availability=True
                ).order_by('title')

    def get_serializer_class(self):
        """Return appropriate serializer class
        """
        if self.action == 'retrieve':
            return serializers.MovieDetailSerializer
        elif self.action == 'upload_image':
            return serializers.MovieImageSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new movie
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """Update a new movie
        """
        title = self.request.data.get('title')
        rental_price = self.request.data.get('rental_price')
        sale_price = self.request.data.get('sale_price')
        instance = serializer.save(user=self.request.user)
        id = instance.id

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a movie
        """
        movie = self.get_object()
        serializer = self.get_serializer(
            movie,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class RentalViewSet(viewsets.ModelViewSet):
    """Manage rent movies in the database
    """
    serializer_class = serializers.RentalSerializer
    queryset = Rental.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the rented movies for the authenticated user
        """
        return self.queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class
        """
        if self.action == 'return_movie':
            return serializers.ReturnRentedMovieSerializer

        return self.serializer_class

    def create(self, request, *args, **kwargs):
        """Validates the request data before renting the movie
        """
        movie_id = self.request.data.get('movie')
        movie = Movie.objects.get(id=movie_id)
        if movie.availability:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        else:
            return Response(
                'The movie you are trying to rent is not available',
                status=status.HTTP_403_FORBIDDEN,
            )

    def perform_create(self, serializer):
        """Create a new rented movie
        """
        movie = self.request.data.get('movie')
        serializer.save(user=self.request.user)
        user = self.request.user

    @action(methods=['POST'], detail=True, url_path='return-movie')
    def return_movie(self, request, pk=None):
        """Return a movie
        """
        rental = self.get_object()

        if rental.date_returned:
            return Response(
                'You already returned this movie',
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(
            rental,
            data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class PurchaseViewSet(viewsets.ModelViewSet):
    """Manage Purchase movies in the database
    """
    serializer_class = serializers.PurchaseSerializer
    queryset = Purchase.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the bought movies for the authenticated user
        """
        return self.queryset.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """Validates the request data before purchasing the movie
        """
        movie_id = self.request.data.get('movie')
        movie = Movie.objects.get(id=movie_id)
        if movie.availability:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        else:
            return Response(
                'The movie you are trying to buy is not available',
                status=status.HTTP_403_FORBIDDEN,
            )

    def perform_create(self, serializer):
        """Create a new Purchase movie
        """
        serializer.save(user=self.request.user)


class LikedMovieViewSet(viewsets.ModelViewSet):
    """Manage liked movies in the database
    """
    serializer_class = serializers.LikedMovieSerializer
    queryset = LikedMovie.objects.all()
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the liked movies for the authenticated user
        """
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        """Create a new Purchase movie
        """
        serializer.save(user=self.request.user)
