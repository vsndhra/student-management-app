from mongoengine import Document, StringField, EmailField, SequenceField

class User(Document):

   ROLES = ('student', 'staff')

   id = SequenceField(primary_key=True)
   name = StringField (max_length=50)
   email = EmailField(required=True, unique=True)
   password = StringField(required=True)
   role = StringField (role = ROLES,max_length=10)
