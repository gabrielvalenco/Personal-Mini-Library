from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, CategoriaViewSet, AutorViewSet, LivroViewSet, AvaliacaoViewSet

# Configurar o router para registrar os ViewSets
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'autores', AutorViewSet)
router.register(r'livros', LivroViewSet)
router.register(r'avaliacoes', AvaliacaoViewSet)

urlpatterns = [
    # Incluir URLs geradas automaticamente pelo router
    path('', include(router.urls)),
    
    # Adicionar URLs para autenticação de API (opcional)
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
