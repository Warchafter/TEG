# Generated by Django 3.1.8 on 2021-05-04 20:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20210428_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyphones',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.deparment', verbose_name='ID Departamento'),
        ),
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.brand', verbose_name='Marca'),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.producttype', verbose_name='ID Tipo de Producto'),
        ),
        migrations.AlterField(
            model_name='productfamily',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='producttype',
            name='product_family',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.productfamily', verbose_name='ID Tipo de Producto'),
        ),
        migrations.AlterField(
            model_name='producttype',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='bank',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.bank', verbose_name='Banco'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='currency',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.currency', verbose_name='Moneda'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='payment_method',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.paymentmethod', verbose_name='Método de Pago'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='payment_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.paymentstatus', verbose_name='Estado del Pago'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='purchase_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.purchasestatus', verbose_name='Estado de la Compra'),
        ),
    ]