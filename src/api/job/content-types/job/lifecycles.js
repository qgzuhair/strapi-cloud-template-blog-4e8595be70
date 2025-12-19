export default {
  beforeCreate(event) {
    const { data } = event.params;

    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;

    // Only generate slug if it's empty
    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }
  }
};
