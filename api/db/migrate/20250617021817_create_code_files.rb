class CreateCodeFiles < ActiveRecord::Migration[8.0]
  def change
    create_table :code_files do |t|
      t.string :filename
      t.text :content

      t.timestamps
    end
  end
end
