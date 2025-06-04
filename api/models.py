from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Usuario(models.Model):
    """Representa o usuário que faz avaliações de livros"""
    nome_usuario = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome_usuario
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

class Categoria(models.Model):
    """Representa a categoria ou gênero de um livro"""
    nome = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

class Autor(models.Model):
    """Representa o autor de um livro"""
    nome = models.CharField(max_length=200)
    
    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = 'Autor'
        verbose_name_plural = 'Autores'

class Livro(models.Model):
    """Representa um livro na biblioteca"""
    titulo = models.CharField(max_length=200)
    ano_publicacao = models.IntegerField(null=True, blank=True)
    
    # Relacionamento N:1 - Um livro tem uma categoria, mas uma categoria pode ter vários livros
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='livros')
    
    # Relacionamento N:N - Um livro pode ter vários autores e um autor pode ter vários livros
    autores = models.ManyToManyField(Autor, related_name='livros')
    
    def __str__(self):
        return self.titulo
    
    class Meta:
        verbose_name = 'Livro'
        verbose_name_plural = 'Livros'

class Avaliacao(models.Model):
    """Representa uma avaliação de um livro feita por um usuário"""
    nota = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comentario = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    
    # Relacionamento 1:N - Um livro pode ter várias avaliações, mas uma avaliação é de um único livro
    livro = models.ForeignKey(Livro, on_delete=models.CASCADE, related_name='avaliacoes')
    
    # Relacionamento N:1 - Um usuário pode fazer várias avaliações, mas uma avaliação é feita por um único usuário
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='avaliacoes')
    
    def __str__(self):
        return f"{self.usuario} - {self.livro}: {self.nota}"
    
    class Meta:
        verbose_name = 'Avaliação'
        verbose_name_plural = 'Avaliações'
        ordering = ['-data_criacao']
