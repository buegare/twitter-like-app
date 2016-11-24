class CreateFollowers < ActiveRecord::Migration[5.0]
  def change
    create_table :followers do |t|
      t.integer :user_id
      t.integer :is_followed_by

      t.timestamps
    end
    add_index :followers, :user_id
  end
end
