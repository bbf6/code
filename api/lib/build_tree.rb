module BuildTree
  def self.create(files)
    splitted = files.map { |f| file_format(f).split('/') }
    tree = splitted
      .map { |r| append_to_tree( r[0], r[1..]) }
      .reduce { |a, b| a.deep_merge(b) }
    sort_hash(tree)
  end

  def self.file_format(file)
    "#{file.filename}.#{file.id}"
  end

  def self.append_to_tree(hash = {}, head, tail)
    hash[head] = {} unless hash[head]
    new_head, *new_tail = tail
    hash[head] = new_head ? append_to_tree(hash[head], new_head, new_tail) : nil
    hash
  end

  def self.sort_hash(hash)
    sorted_hash = hash.each_with_object({}) do |(key, value), new_hash|
      new_hash[key] = value.is_a?(Hash) ? sort_hash(value) : value
    end
    sorted_hash.sort_by { |k, v| [v.is_a?(Hash) ? 0 : 1, k] }.to_h
  end
end
