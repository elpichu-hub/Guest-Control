# Generated by Django 3.2.4 on 2021-10-17 22:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0036_alter_guestlog_special_note'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='date_logged',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
