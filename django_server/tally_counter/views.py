from rest_framework import serializers
from rest_framework import viewsets, permissions, routers
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models


class TallySubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TallySubject
        fields = ['id', 'name', 'count']


class TallySubjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.TallySubject.objects.all()
    serializer_class = TallySubjectSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['put'])
    def count(self, request, pk=None):
        count = request.data.get('count')
        instance = self.get_object()
        instance.counts.create(count=count)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


router = routers.DefaultRouter()
router.register('tally_subjects', TallySubjectViewSet)