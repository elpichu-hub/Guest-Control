# Generated by Django 3.2.4 on 2021-06-21 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mockdatabase',
            name='name',
        ),
        migrations.AddField(
            model_name='mockdatabase',
            name='guest_last_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='mockdatabase',
            name='guest_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='mockdatabase',
            name='address',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
