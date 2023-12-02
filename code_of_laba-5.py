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
        self.object = []
    
    def add_object(self, furniture):
        if self.check_size(furniture):
            self.object.append(furniture)
            print(f"Об*єкт {furniture.name} додано до кімнати " )
        else:
            print(f"Об*єкт {furniture.name} НЕ додано до кімнати, бо не вміщається в кімнату " )
        
    def check_size(self, furniture):
        x, y = furniture.coordinates
        width, height = furniture.size

        return 0 <= x < self.size_room[0] and 0 <= y < self.size_room[1] and x + width <= self.size_room [0] and y + height <= self.size_room [1]
            
    def remove_object(self, furniture):
        if furniture in self.object:
            self.object.remove(furniture)
            print(f"\nОб*єкт {furniture.name} видалено з кімнати")
        else:
            print(f"\nОб*єкт {furniture.name} не знайдено в кімнаті")
            
    def rearrangement(self, object_name, new_coordinates):
        check_furniture = self.find_object(object_name)
        if check_furniture:
            if self.check_size(check_furniture):
                check_furniture.coordinates = new_coordinates
            else:
                print(f"Об*єкт {check_furniture.name} не вміщається в кімнаті в кімнаті")
        else:
            print(f"Об*єкт {object_name} не знайдено в кімнаті")

    def find_object(self, name):
        for obj in self.object:
            if obj.name == name:
                return obj
        return None
    
    def display_info(self):
        for obj in self.object:
            print(obj)


def main():
    room_size = [10, 10]

    sofa = Furniture("Диван", [2, 3], [1, 4])
    wardrobe = Furniture("Шафа-купе", [1, 5], [2, 3])
    stelag = Furniture("Стелаж для книжок", [0, 8], [4, 7])

    room = Room(room_size)

    room.add_object(sofa)
    room.add_object(wardrobe)
    room.add_object(stelag)

    print('\nКімната на початку:')
    room.display_info()
 
    room.rearrangement('Шафа-купе', [6,5])

    print('\nКімната після перестановки')
    room.display_info()

    room.remove_object(sofa)


if __name__ == '__main__' :
    main()





    
