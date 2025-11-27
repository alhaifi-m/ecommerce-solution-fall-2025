import { SearchBarProps } from '@/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = 'Search...',
    onSearch,
    initialValue = '',
}) => {
    const [query, setQuery] = useState(initialValue);

    // update local state if initialValue changes
    useEffect(() => {
        setQuery(initialValue);
    }, [initialValue]);

    // handle Search action
    const handleSearch = () => {
        if(query.trim() && onSearch) {
            onSearch(query.trim());
        }
    }
    const handleClear = (): void => {
        setQuery('');
        if(onSearch) {
            onSearch('');
        }
    }
  return (
    <View>
      <TextInput placeholder="Search products..." style={styles.input} />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})