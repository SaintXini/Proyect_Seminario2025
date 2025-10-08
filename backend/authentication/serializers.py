from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User, Equipment, Event, OccupiedDate

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type
        data['user_id'] = self.user.id
        data['username'] = self.user.username
        return data

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'user_type', 'password']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.get_full_name', read_only=True)
    equipment_names = serializers.StringRelatedField(source='equipment', many=True, read_only=True)
    
    class Meta:
        model = Event
        fields = '__all__'

class OccupiedDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = OccupiedDate
        fields = '__all__'