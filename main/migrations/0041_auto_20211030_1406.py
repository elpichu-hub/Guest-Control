# Generated by Django 3.2.4 on 2021-10-30 18:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0040_auto_20211028_2355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='date_logged',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='time_logged',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
