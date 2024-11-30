from django.db import models
from taggit.managers import TaggableManager
# Create your models here.
class News(models.Model):
    title=models.CharField(max_length=300)
    description= models.TextField(max_length=250,default=None)
    text=models.TextField()
    image=models.ImageField(upload_to='news_images/',blank=True,null=True)
    tags=TaggableManager()
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title