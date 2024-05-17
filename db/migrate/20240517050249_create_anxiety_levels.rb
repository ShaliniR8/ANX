class CreateAnxietyLevels < ActiveRecord::Migration[7.1]
  def change
    create_table :anxiety_levels do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :level
      t.date :date

      t.timestamps
    end
  end
end
