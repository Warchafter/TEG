# Generated by Django 3.1.8 on 2021-04-27 15:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20210427_1431'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companybankaccounts',
            name='bank_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.bank', verbose_name='ID Banco'),
        ),
        migrations.AlterField(
            model_name='companyphones',
            name='department',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.deparment', verbose_name='ID Departamento'),
        ),
        migrations.AlterField(
            model_name='product',
            name='brand',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.brand', verbose_name='Marca'),
        ),
        migrations.AlterField(
            model_name='product',
            name='presentation_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.presentationtype', verbose_name='ID Presentacion'),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.producttype', verbose_name='ID Tipo de Producto'),
        ),
        migrations.AlterField(
            model_name='productfamily',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='producttype',
            name='product_family',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.productfamily', verbose_name='ID Tipo de Producto'),
        ),
        migrations.AlterField(
            model_name='producttype',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='bank',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.bank', verbose_name='Banco'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='currency',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.currency', verbose_name='Moneda'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='payment_method',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.paymentmethod', verbose_name='Método de Pago'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='payment_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.paymentstatus', verbose_name='Estado del Pago'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='purchase_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.purchasestatus', verbose_name='Estado de la Compra'),
        ),
        migrations.AlterField(
            model_name='purchasebill',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='supplier',
            name='bank_accounts',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.supplierbankaccounts'),
        ),
        migrations.AlterField(
            model_name='supplierbankaccounts',
            name='bank_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.bank', verbose_name='ID Banco'),
        ),
        migrations.AlterField(
            model_name='supplieremployees',
            name='supplier',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.supplier'),
        ),
    ]
