module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'Todoes',
      'content_name',
      {
        type: DataTypes.STRING,
        allowNull: true
      }
    )
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.removeColumn(
      'Todoes', 'content_name'
    )
    done()
  }
}