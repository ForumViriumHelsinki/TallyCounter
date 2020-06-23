from django.db import models


class TallySubject(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name or super().__str__()

    def count(self):
        latest = self.counts.all().order_by('-timestamp').first()
        return latest.count if latest else 0


class TallyCount(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)
    count = models.IntegerField()
    subject = models.ForeignKey(TallySubject, related_name='counts', on_delete=models.CASCADE)

    def __str__(self):
        return f'Subject {self.subject_id}: {self.count}'
