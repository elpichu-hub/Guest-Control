# Generated by Django 3.2.4 on 2021-06-24 15:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_auto_20210624_1137'),
    ]

    operations = [
        migrations.RenameField(
            model_name='resident',
            old_name='phone',
            new_name='resident_phone',
        ),
    ]
