# Generated by Django 3.1.8 on 2021-04-27 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20210426_2125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='business_name',
            field=models.CharField(default='', max_length=255, verbose_name='nombre de la empresa'),
        ),
    ]
