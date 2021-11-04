# Generated by Django 3.2.4 on 2021-10-13 20:25

import datetime
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0028_alter_guestlog_company'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='address',
            field=models.CharField(blank=True, default=None, max_length=100),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='date_logged',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='last_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='plate',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='time_logged',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='vehicle',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]