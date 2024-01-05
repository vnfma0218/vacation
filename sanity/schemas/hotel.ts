import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'hotel',
  title: 'Hotel',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: { type: 'location' },
    }),

    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: '특가', value: 'sale' },
              { title: '인기', value: 'popular' },
            ],
            layout: 'dropdown',
          },
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: 'rate',
      title: 'Rate',
      type: 'number',
      validation: (Rule) => [Rule.greaterThan(0), Rule.lessThan(6)],
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),

    defineField({
      name: 'discountPrice',
      title: 'DiscountPrice',
      type: 'number',
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
  ],
  initialValue: () => ({
    rate: 3.4,
    price: 85000,
  }),

  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
    },
  },
});
