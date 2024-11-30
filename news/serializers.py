from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'  # Use the tag name for serialization
    )


    class Meta:
          model=News
          fields= '__all__'
          
