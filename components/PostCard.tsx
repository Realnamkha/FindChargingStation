// components/Postcard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { getFileUrl } from "../lib/appwrite"; // adjust path

const { width } = Dimensions.get("window");
const CARD_MARGIN = 16;
export const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2; // 2-column grid

type Item = {
  $id: string;
  name: string;
  price: number | string;
  imageId?: string;
};

type Props = {
  item: Item;
  bucketId: string;
  onPress?: () => void;
  onAddToCart?: () => void;
};

export default function Postcard({
  item,
  bucketId,
  onPress,
  onAddToCart,
}: Props) {
  const imageUri = item.imageId
    ? getFileUrl(bucketId, item.imageId)
    : undefined;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { width: CARD_WIDTH }]}
    >
      {/* Item Image */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={{ fontSize: 28 }}>📦</Text>
        </View>
      )}

      {/* Item Details */}
      <View style={styles.content}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {item.name}
        </Text>

        <Text style={styles.price}>
          {typeof item.price === "number"
            ? `$${item.price.toFixed(2)}`
            : item.price}
        </Text>

        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={onAddToCart}
          style={styles.addToCartButton}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0B2545", // oxford blue
    borderRadius: 16,
    marginBottom: CARD_MARGIN,
    borderWidth: 1,
    borderColor: "#1A3A61",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 140,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A3A61",
  },
  content: {
    padding: 12,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  price: {
    color: "#A0C1FF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  addToCartButton: {
    backgroundColor: "#1A73E8",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
