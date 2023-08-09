from mongoengine import Document, DateTimeField, StringField, EmailField, SequenceField, BooleanField, FileField

class Submission(Document):

   id = SequenceField(primary_key=True)
   name = StringField(max_length=50)
   rollno = StringField(max_length=50)
   title = StringField(max_length=100)
   date = StringField(required=True)
   time = StringField(required=True)
   file = StringField(required=True)
