# Generated by Django 5.1.3 on 2024-11-30 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0004_news_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='description',
            field=models.TextField(default=None, max_length=250),
        ),
    ]
