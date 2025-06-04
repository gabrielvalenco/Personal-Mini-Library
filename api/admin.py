from django.contrib import admin
from .models import Usuario, Categoria, Autor, Livro, Avaliacao

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome_usuario')
    search_fields = ('nome_usuario',)

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')
    search_fields = ('nome',)

@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome')
    search_fields = ('nome',)

@admin.register(Livro)
class LivroAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'ano_publicacao', 'categoria')
    list_filter = ('categoria', 'autores')
    search_fields = ('titulo',)
    filter_horizontal = ('autores',)

@admin.register(Avaliacao)
class AvaliacaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'livro', 'usuario', 'nota', 'data_criacao')
    list_filter = ('nota', 'data_criacao')
    search_fields = ('comentario', 'livro__titulo', 'usuario__nome_usuario')
