
import { GoogleGenAI, Type } from "@google/genai";
import { Product, AiProduct } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getAiRecommendations = async (browsedProducts: Product[]): Promise<AiProduct[]> => {
  if (browsedProducts.length === 0) {
    return [];
  }

  const productNames = browsedProducts.map(p => p.name).join(', ');
  const prompt = `
    Based on a user's interest in the following products: ${productNames}, 
    suggest 4 other fictional but realistic-sounding products they might like for an e-commerce website. 
    Do not suggest products that are too similar to the ones provided. Broaden the recommendations to related categories.
    For each product, provide a name, price, a short, compelling description, and a plausible category.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: 'The name of the recommended product.',
              },
              price: {
                type: Type.NUMBER,
                description: 'The price of the product.',
              },
              description: {
                type: Type.STRING,
                description: 'A short, compelling description of the product.',
              },
              category: {
                type: Type.STRING,
                description: 'The category of the product (e.g., Electronics, Home, Apparel).',
              },
            },
            required: ["name", "price", "description", "category"],
          },
        },
      },
    });
    
    const jsonText = response.text.trim();
    const recommendedProducts = JSON.parse(jsonText);
    return recommendedProducts as AiProduct[];
  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    return [];
  }
};

export const processSearchQuery = async (query: string, categories: string[]): Promise<{ searchTerm: string, category: string | null, minPrice: number | null, maxPrice: number | null }> => {
  const prompt = `
    Analyze the following user search query for an e-commerce site and extract structured search criteria.
    The available product categories are: ${categories.join(', ')}.
    If the query mentions a category, it must be one of the available categories. If it doesn't match, set category to null.
    Extract a general search term (like "laptop" from "budget-friendly gaming laptops under 50k").
    Extract a minimum and maximum price if specified.

    User Query: "${query}"

    Respond with only the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            searchTerm: {
              type: Type.STRING,
              description: "A concise search term derived from the query. Should be a noun or noun phrase.",
            },
            category: {
              type: Type.STRING,
              description: `One of the provided categories: ${categories.join(', ')} or null if not applicable.`,
            },
            minPrice: {
              type: Type.NUMBER,
              description: "The minimum price mentioned, or null if not specified.",
            },
            maxPrice: {
              type: Type.NUMBER,
              description: "The maximum price mentioned, or null if not specified.",
            },
          },
          required: ["searchTerm", "category", "minPrice", "maxPrice"],
        },
      },
    });

    const jsonText = response.text.trim();
    const searchCriteria = JSON.parse(jsonText);
    
    // Validate category
    if (searchCriteria.category && !categories.includes(searchCriteria.category)) {
      searchCriteria.category = null;
    }

    return searchCriteria;
  } catch (error) {
    console.error("Error processing search query with AI:", error);
    // Fallback to a simple search if AI fails
    return {
      searchTerm: query,
      category: null,
      minPrice: null,
      maxPrice: null,
    };
  }
};


export const getSimilarProducts = async (currentProduct: Product, allProducts: Product[]): Promise<number[]> => {
  // To avoid exceeding token limits, we only send essential info about other products.
  const productCatalogInfo = allProducts
    .filter(p => p.id !== currentProduct.id) // Don't include the current product in the list
    .map(p => ({ id: p.id, name: p.name, category: p.category, description: p.description.substring(0, 100) }));

  const prompt = `
    Based on the following product:
    - Name: ${currentProduct.name}
    - Category: ${currentProduct.category}
    - Description: ${currentProduct.description}

    From the product catalog provided below, find the 4 most similar products.
    Consider products in the same category or related categories that a user might also be interested in.
    
    Product Catalog:
    ${JSON.stringify(productCatalogInfo)}

    Return a JSON array containing only the integer IDs of the 4 recommended products. Example: [12, 3, 18, 5]
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.INTEGER },
        },
      },
    });

    const jsonText = response.text.trim();
    const recommendedIds = JSON.parse(jsonText);
    return recommendedIds as number[];
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return [];
  }
};
