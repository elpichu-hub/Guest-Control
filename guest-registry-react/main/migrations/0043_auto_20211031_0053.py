# Generated by Django 3.2.4 on 2021-10-31 04:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0042_resident_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='house',
            name='unit',
        ),
        migrations.RemoveField(
            model_name='resident',
            name='unit',
        ),
    ]