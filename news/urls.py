from django.urls import path
from . import views

urlpatterns = [
    path("api/news/latest/", views.latest_news, name="latest-news"),
    path("api/news/business/", views.business_news, name="business-news"),
    path("api/news/politics/", views.politics_news, name="politics-news"),
    
]