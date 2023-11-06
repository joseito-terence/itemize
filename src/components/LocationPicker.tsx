import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Leaflet, { Markers, Layers } from 'react-native-leaflet-ts';
import axios from 'axios';
import _debounce from 'lodash.debounce';
import type { TPlace } from '../../types';

const mapLayers: Layers[] = [
  {
    name: 'Layer 1',
    src: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
];

type Props = {
  onChange: (location: TPlace) => void;
};

const LocationPicker = ({ onChange }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TPlace[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<TPlace | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearchLocation = _debounce(text => {
    searchLocation(text);
  }, 300);

  const searchLocation = async (q: string) => {
    try {
      const response = await axios
        .get(
          `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`,
        )
        .then(res => {
          return res.data.map((item: any) => ({
            ...item,
            lat: Number(item.lat),
            lon: Number(item.lon),
          }));
        });
      setResults(response);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const markerList: Markers[] = selectedLocation
    ? [
        {
          latLng: [selectedLocation.lat, selectedLocation.lon],
          title: selectedLocation.display_name,
          iconSize: {
            width: 40,
            height: 40,
          },
        },
      ]
    : [];

  return (
    <View className="flex-1 w-full">
      <View>
        <TextInput
          label="Location"
          placeholder="Search for a location"
          mode="outlined"
          className="mb-4"
          value={selectedLocation?.display_name || query}
          onChangeText={text => {
            setQuery(text);
            debouncedSearchLocation(text);
            setShowSuggestions(!!text);
          }}
        />
        {showSuggestions && (
          <View className="absolute top-[80%] left-0 right-0 bg-black z-10 rounded-md">
            <FlatList
              data={results}
              keyExtractor={item => item.place_id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-2 px-4"
                  onPress={() => {
                    setSelectedLocation(item);
                    onChange(item);
                    setShowSuggestions(false);
                  }}>
                  <Text>{item.display_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
      <View className="flex-1 rounded-md overflow-hidden">
        <Leaflet
          mapLayers={mapLayers}
          zoom={2}
          markers={markerList}
          flyTo={{
            latLng: [selectedLocation?.lat || 0, selectedLocation?.lon || 0],
            zoom: 15,
          }}
          backgroundColor="transparent"
        />
      </View>
    </View>
  );
};

export default React.memo(LocationPicker);
