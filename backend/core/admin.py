from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from core import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {
         'fields': ('name', 'business_name', 'business_type',
                    'specialization', 'rif', 'roles')}),
        (
            _('Permissions'),
            {'fields': ('is_active', 'is_staff',
                        'is_superuser', 'rif_validated')}
        ),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )


admin.site.register(models.User, UserAdmin)
admin.site.register(models.Specialization)
admin.site.register(models.CharacteristicTypes)
admin.site.register(models.Product)
admin.site.register(models.ProductCharacteristics)
admin.site.register(models.Brand)
admin.site.register(models.Supplier)
admin.site.register(models.SupplierEmails)
admin.site.register(models.SupplierProducts)
admin.site.register(models.Bank)
admin.site.register(models.PaymentMethod)
admin.site.register(models.Currency)
admin.site.register(models.PurchaseStatus)
admin.site.register(models.PaymentStatus)
admin.site.register(models.DeliveryStatus)
admin.site.register(models.BillClientSubmission)
admin.site.register(models.PurchaseBill)
admin.site.register(models.BillDetail)
admin.site.register(models.BillProductCharacteristics)
admin.site.register(models.BillPaymentDetail)
