# Generated by Django 3.1.8 on 2021-05-04 20:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_auto_20210504_2013'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='business_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='business_type',
        ),
        migrations.RemoveField(
            model_name='user',
            name='specialization',
        ),
    ]