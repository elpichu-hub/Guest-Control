# Generated by Django 3.2.4 on 2021-11-05 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0044_auto_20211031_0059'),
    ]

    operations = [
        migrations.AlterField(
            model_name='guestlog',
            name='special_note',
            field=models.TextField(blank=True, default=None, max_length=100),
        ),
    ]
