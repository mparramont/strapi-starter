export default ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        // to avoid allowing to set accessRole on registration
        allowedFields: [],
      },
    },
  },
});
