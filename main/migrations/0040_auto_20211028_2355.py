# Generated by Django 3.2.4 on 2021-10-29 03:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0039_auto_20211028_2328'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='date_logged',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 10, 28, 23, 55)),
        ),
        migrations.AlterField(
            model_name='guestlog',
            name='time_logged',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2021, 10, 28, 23, 55)),
        ),
    ]
