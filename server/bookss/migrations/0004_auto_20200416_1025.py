# Generated by Django 3.0.5 on 2020-04-16 04:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookss', '0003_auto_20200416_1016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
