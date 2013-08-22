module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'Todoes',
      'project',
      {
        type: DataTypes.STRING,
        allowNull: true
      }
    );
    done()
  },
  down: function(migration, DataTypes, done) {
    migration.removeColumn('Todoes', 'project');
    done()
  }
}