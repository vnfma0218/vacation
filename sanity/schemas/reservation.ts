import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'reservation',
  title: 'Reservation',
  type: 'document',
  fields: [
    defineField({
      name: 'confirmNumber',
      title: 'ConfirmNumber',
      type: 'string',
    }),
    defineField({
      name: 'visitType',
      title: 'VisitType',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
      name: 'checkIn',
      title: 'CheckIn',
      type: 'date',
    }),
    defineField({
      name: 'checkOut',
      title: 'CheckOut',
      type: 'date',
    }),

    defineField({
      name: 'person',
      title: 'Person',
      type: 'number',
    }),
    defineField({
      name: 'hotel',
      title: 'Hotel',
      type: 'reference',
      to: { type: 'hotel' },
    }),
  ],

  preview: {
    select: {
      title: 'confirmNumber',
      subTitle: 'name',
    },
  },
});
