import { HStack, Stack, Badge, Button, Image, Text, Heading } from '@chakra-ui/react';
import * as React from 'react';
import SearchResult from '../result/SearchResult';

interface SearchListProps {
  medias: any[]
}

const SearchList: React.FC<SearchListProps> = ({ medias }) => {
  return (
    <>
      {
        medias.map(anime => {
          return (
            <SearchResult key={anime.id} anime={anime}/>
          )
        })
      }
    </>
  );
};

export default SearchList;