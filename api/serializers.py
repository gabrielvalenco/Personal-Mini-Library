from rest_framework import serializers
from .models import Usuario, Categoria, Autor, Livro, Avaliacao

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'

class AvaliacaoSerializer(serializers.ModelSerializer):
    usuario_nome = serializers.ReadOnlyField(source='usuario.nome_usuario')
    
    class Meta:
        model = Avaliacao
        fields = ['id', 'nota', 'comentario', 'data_criacao', 'livro', 'usuario', 'usuario_nome']

class LivroSerializer(serializers.ModelSerializer):
    categoria_nome = serializers.ReadOnlyField(source='categoria.nome')
    autores_info = AutorSerializer(source='autores', many=True, read_only=True)
    avaliacoes = AvaliacaoSerializer(many=True, read_only=True)
    nota_media = serializers.SerializerMethodField()
    
    class Meta:
        model = Livro
        fields = ['id', 'titulo', 'ano_publicacao', 'categoria', 'categoria_nome', 
                  'autores', 'autores_info', 'avaliacoes', 'nota_media']
    
    def get_nota_media(self, obj):
        """Calcula a nota média das avaliações do livro"""
        avaliacoes = obj.avaliacoes.all()
        if avaliacoes:
            return sum(avaliacao.nota for avaliacao in avaliacoes) / len(avaliacoes)
        return None
