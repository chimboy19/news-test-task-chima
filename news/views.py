from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission,IsAuthenticated,AllowAny
from django.http import JsonResponse
from rest_framework.response import Response
from .models import News
from .serializers import NewsSerializer

# Create your views here.
class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class  NewsViewSet(ModelViewSet):
    queryset=News.objects.all()
    serializer_class = NewsSerializer
    # permission_classes = [IsAdminUser,IsAuthenticated]
    def get_permissions(self):
        if self.action in ['destroy']:  # Only allow admins to delete news
            return [IsAdminUser()]
        elif self.action in ['list','like','dislike','view', 'retrieve', 'latest_news', 'business_news', 'politics_news']:
            return [AllowAny()]  # Allow anyone to view news
        else:
            return [IsAuthenticated()]  # 
    # permission_classes = [IsAuthenticated] 


    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        news = self.get_object()
        news.likes += 1
        news.save()
        return Response({'likes': news.likes})


    @action(detail=True, methods=['post'])
    def dislike(self, request, pk=None):
        news = self.get_object()
        news.dislikes += 1
        news.save()
       
        return Response({'dislikes': news.dislikes})
    
    @action (detail=True, methods=['post'])
    def view(self, request, pk=None):
        news=self.get_object()
        news.views +=1
        news.save()
        return Response({'views': news.views})
    

    @action(detail=False, methods=['get'], url_path='latest')
    def latest_news(self, request):
        # Filter news with the tag 'Latest News'
        latest_news = News.objects.filter(tags__name__in=["Latest News"])
        data = [
            {
                "id": news.id,
                "title": news.title,
                "description":news.description,
                "text": news.text,
                "image": news.image.url if news.image else None,
                "likes": news.likes,
                "dislikes": news.dislikes,
                "views": news.views,
            }
            for news in latest_news
        ]
        return Response(data)
    

    @action(detail=False, methods=['get'], url_path='business')
    def business_news(self, request):
        
        business_news = News.objects.filter(tags__name__in=["Busniess"])
        data = [
            {
                "id": news.id,
                "title": news.title,
                "description":news.description,
                "text": news.text,
                "image": news.image.url if news.image else None,
                "likes": news.likes,
                "dislikes": news.dislikes,
                "views": news.views,
            }
            for news in business_news
        ]
        return Response(data)
    

    @action(detail=False, methods=['get'], url_path='politics')
    def politics_news(self, request):
        
        politics_news = News.objects.filter(tags__name__in=["politics"])
        data = [
            {
                "id": news.id,
                "title": news.title,
                "description":news.description,
                "text": news.text,
                "image": news.image.url if news.image else None,
                "likes": news.likes,
                "dislikes": news.dislikes,
                "views": news.views,
            }
            for news in politics_news
        ]
        return Response(data)