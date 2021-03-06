const graphql = require('graphql');
const { GraphQLList, GraphQLObjectType, GraphQLString } = graphql;

module.exports = data => {
  const ItemType = require('./item.type')(data);
  return new GraphQLObjectType({
    name: 'Query',
    description: 'The root of all... queries',
    fields: () => ({
      items: {
        type: new GraphQLList(ItemType),
        resolve: root => {
          const result = [];
          data.forEach((item, key) => {
            item.key = key;
            result.push(item);
          });
          return result;
        },
      },
      item: {
        type: ItemType,
        args: {
          key: { type: GraphQLString },
        },
        resolve: (root, args) => {
          return data.get(args.key);
        },
      },
    }),
  });
};
