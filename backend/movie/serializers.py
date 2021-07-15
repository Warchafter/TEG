from django.utils import timezone
from rest_framework import serializers

from core.models import Genre, LikedMovie, Movie, Rental, Purchase


class GenreSerializer(serializers.ModelSerializer):
    """Serializer for tag objects
    """

    class Meta:
        model = Genre
        fields = ('id', 'name')
        read_only_fields = ('id',)


class MovieSerializer(serializers.ModelSerializer):
    """Serialize a movie
    """
    genre = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Genre.objects.all()
    )

    class Meta:
        model = Movie
        fields = (
            'id', 'title', 'description', 'link', 'genre', 'image',
            'stock', 'rental_price', 'sale_price', 'availability',
            'likes'
        )
        read_only_fields = ('id', 'image', 'likes')
        ordering = ('id',)


class MovieDetailSerializer(MovieSerializer):
    """Serialize a movie detail
    """
    genre = GenreSerializer(many=True, read_only=True)


class MovieImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to movies
    """

    class Meta:
        model = Movie
        fields = ('id', 'image')
        read_only_fields = ('id',)


class RentalSerializer(serializers.ModelSerializer):
    """Serialize a Rental object
    """

    class Meta:
        model = Rental
        fields = ('id', 'user', 'movie', 'date_out',
                  'date_returned', 'daily_rental_fee', 'rental_debt')
        read_only_fields = (
            'id', 'user', 'date_out', 'daily_rental_fee',
            'rental_debt', 'date_returned'
        )


class ReturnRentedMovieSerializer(serializers.ModelSerializer):
    """Serializer for returning a rented movie
    """

    class Meta:
        model = Rental
        fields = ('id', 'user', 'movie', 'date_out',
                  'date_returned', 'daily_rental_fee', 'rental_debt')
        read_only_fields = ('id', 'user', 'movie', 'date_out',
                            'date_returned', 'daily_rental_fee', 'rental_debt')

    def to_internal_value(self, data):
        instance = super(ReturnRentedMovieSerializer,
                         self).to_internal_value(data)
        instance["date_returned"] = timezone.now()
        return instance


class PurchaseSerializer(serializers.ModelSerializer):
    """Serialize a Purchase object
    """

    class Meta:
        model = Purchase
        fields = ('id', 'user', 'movie', 'date_bought', 'purchase_price')
        read_only_fields = (
            'id', 'user', 'date_bought', 'purchase_price')


class LikedMovieSerializer(serializers.ModelSerializer):
    """Serialize a like to a movie
    """

    class Meta:
        model = LikedMovie
        fields = ('id', 'user', 'movie')
        read_only_fields = ('id', 'user')
