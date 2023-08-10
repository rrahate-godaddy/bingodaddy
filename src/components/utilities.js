import { doc, setDoc, getDoc, collection, updateDoc, arrayUnion, getDocs, onSnapshot } from "firebase/firestore"; 

// Generate a Card
export function GenerateCard() {

    const B = randomUnique(1,15)
    const I = randomUnique(16,30)
    const NOld = randomUnique(31,45)
    const N = Object.assign([], NOld, {2: "FREE"});
    const G = randomUnique(46,60)
    const O = randomUnique(61,75)
    const Card = {

      b: B,
      i: I,
      n: N,
      g: G,
      o: O

    }

    return Card

}

// Generate a Random Array 
const randomUnique = (min, max) => {
    let nums = new Set();
    const range = max - min + 1

    while (nums.size < 5) {
        nums.add(Math.floor(Math.random() * range + min));
    }
    return [...nums];
}


export async function ReturnCardData(database, pid, gid) {

    const cardRef = doc(database, "players", pid, "cards", gid)
    const cardSnap = await getDoc(cardRef);

    if (cardSnap.exists()) {
        
        const x = cardSnap.data()
        return x;

        
      } else{

        return null;
        
      }
}


export async function ReturnPlayerDB(database, pid) {
  const playerRef = doc(database, "players", pid)
  const playerSnap = await getDoc(playerRef);

  if (playerSnap.exists()) {
        
    const x = playerSnap.data()
    return x;

    
  } else{

    return null;
    
  }

}

export const theme = {
  dark: {
    scheme: "dark",
    background: "#222",
    textcolor: "#fff",
    gray: "#ddd",
    
    card: {
      cellBg: "#fff",
      cellFont: "#111",
      cellRed: "#FD341D",
      cellBorder: "#111",
      active: {
        cellBg: "#5b6a62",
        cellFont: "#111",
      }
    },

    button: {
      primary: {
        bg: "#111",
        color: "#fff",
      },

      secondary: {
        bg: "transparent",
        color: "#111",
      }
    },

    rightrail: {
      bg: "#002E2B",
    }

  },

  light: {
    scheme: "light",
    background: "#A6FFF8",
    textcolor: "#111",
    gray: "#555",

    card: {
      cardbg: "#fff",
      cellBg: "#61EDEA",
      cellFont: "#111",
      cellRed: "#FD341D",
      cellBorder: "#61EDEA",
      active: {
        cellBg: "#FED317",
        cellFont: "#91BCA0",
      }
    },

    button: {
      primary: {
        bg: "#111",
        color: "#fff",
      },

      secondary: {
        bg: "transparent",
        color: "#111",
      }
    },

    rightrail: {
      bg: "#1966B3",
    }
  }

}