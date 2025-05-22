import datetime,bday_messages

today = datetime.date.today()
next_birthday = datetime.date(1994,7,2)

days_away = today - next_birthday
if days_away == 0:
    print(bday_messages.random_message)
else:
    print(f'My next birthday is {days_away.days} days away!')