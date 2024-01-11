Feature: Test that all basic Create/Update/Delete functions for pets work properly

  Scenario: Create a new Pet
    When I create a pet with id <id>, name "<PetName>", and category "<PetCategory>"
    Then the pet will be created successfully
    When I retrieve the pet by its id
    Then its name will match "<PetName>" 
     And its category will match "<PetCategory>"

    Examples:
      | id       |  PetName | PetCategory |
      | 1234     |Sunny     | Dog         |
      | 0        |Tara      | Cat         |

  Scenario: Update a Pet
    Given a pet with id <id>, and name "<PetName>" 
    When I update its name to "<NewPetName>"
     And I retrieve the pet by its id
    Then its name will match "<NewPetName>" 
      
    Examples:
      | id       | PetName | NewPetName |
      | 123456   | Sunny   | Bunny      |

  Scenario: Delete a Pet
    Given a pet with id <id>, and name "<PetName>" 
    When I delete the pet
     And I retrieve the pet by its id
    Then I will get an error "Pet not found"
      
    Examples:
      | id      | PetName | 
      | 1234567 | Tara    |