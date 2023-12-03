class Furniture:
    def __init__(self, name = "", coordinates =[], size = []):
        self.name = name
        self.coordinates = coordinates
        self.size = size

    def __str__(self):
        return f" Об*єкт {self.name} має координати {self.coordinates} та розмір {self.size} "
    

class Room:
    def __init__(self, size_room = []):
        self.size_room = size_room
        self.furniture_pieces_in_room = []
        
    def check_furniture_size(self, furniture_piece):
        x, y = furniture_piece.coordinates
        width, height = furniture_piece.size

        return 0 <= x < self.size_room[0] and 0 <= y < self.size_room[1] and x + width <= self.size_room[0] and y + height <= self.size_room[1]
        
    def add_furniture_piece(self, furniture_piece):
        if self.check_furniture_size(furniture_piece):
            self.furniture_pieces_in_room.append(furniture_piece)
            print(f"Об*єкт {furniture_piece.name} додано до кімнати " )
        else:
            print(f"Об*єкт {furniture_piece.name} НЕ додано до кімнати, бо не вміщається в кімнату " )
        
    def remove_furniture_piece(self, furniture_piece):
        if furniture_piece in self.furniture_pieces_in_room:
            self.furniture_pieces_in_room.remove(furniture_piece)
            print(f"\nОб*єкт {furniture_piece.name} видалено з кімнати")
        else:
            print(f"\nОб*єкт {furniture_piece.name} не знайдено в кімнаті")
            
    def rearrangement_furniture_piece(self, furniture_piece_name, new_coordinates):
        check_furniture_presence = self.find_furniture_piece(furniture_piece_name)
        if check_furniture_presence:
            if self.check_furniture_size(check_furniture_presence):
                check_furniture_presence.coordinates = new_coordinates
            else:
                print(f"Об*єкт {check_furniture_presence.name} не вміщається в кімнаті в кімнаті")
        else:
            print(f"Об*єкт {furniture_piece_name} не знайдено в кімнаті")

    def find_furniture_piece(self, name):
        for obj in self.furniture_pieces_in_room:
            if obj.name == name:
                return obj
        return None
    
    def display_info(self):
        for obj in self.furniture_pieces_in_room:
            print(obj)


def main():
    room_size = [10, 10]
    
    room = Room(room_size)
    
    sofa = Furniture("Диван", [2, 3], [1, 4])
    wardrobe = Furniture("Шафа-купе", [1, 5], [2, 3])
    stelag = Furniture("Стелаж для книжок", [0, 8], [4, 7])

    room.add_furniture_piece(sofa)
    room.add_furniture_piece(wardrobe)
    room.add_furniture_piece(stelag)

    print('\nКімната на початку:')
    room.display_info()
 
    room.rearrangement_furniture_piece('Шафа-купе', [6,5])

    print('\nКімната після перестановки')
    room.display_info()

    room.remove_furniture_piece(sofa)


if __name__ == '__main__' :
    main()
