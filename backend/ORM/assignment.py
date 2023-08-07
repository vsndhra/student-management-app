from mongoengine import Document, DateTimeField, StringField, EmailField, SequenceField, BooleanField

class Assignment(Document):

   id = SequenceField(primary_key=True)
   title = StringField (max_length=100)
   description = StringField(max_length=100, required=True)
   date = StringField(required=True)
   time = StringField(required=True)
   marks = StringField(required=True)
   status = BooleanField(required=True)
