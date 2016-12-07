import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  Meteor.publish('events', function eventsPublication(){
    return Events.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]
    });
  })

  Meteor.publish('singleEvent', function singleEventPublication(eventId){
    return Events.find({ _id: eventId }, {
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ]
    });
  })
}

Meteor.methods({
  'events.insert' (text) {
    check(text, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.insert({
      title: text,
      createdAt: new Date(),
      owner: this.userId,
      category: 'leisure',
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'events.remove' (eventId) {
    check(eventId, String);

    const event = Events.findOne(eventId);
    if (event.private && event.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.remove(eventId);
  },
  'events.setPrivate' (eventId, setToPrivate) {
    check(eventId, String);
    check(setToPrivate, Boolean);

    const event = Events.findOne(eventId);

    if (event.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.update(eventId, { $set: { private: setToPrivate } });
  }
})
